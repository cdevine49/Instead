require 'rails_helper'

RSpec.describe Api::UsersController, type: :controller do

  describe "before actions" do
    it { should use_before_action(:require_logged_out!) }
    it { should use_before_action(:require_logged_in!) }
    it { should use_before_action(:require_current_user!) }
  end

  let(:user) { FactoryGirl.build(:user) }
  let(:other) {FactoryGirl.build(:user)}

  describe "#create" do

    context "when a user is logged in" do
      before(:each) do
        allow_any_instance_of(ApplicationController).to receive(:current_user).and_return(user)
        post :create, user: { email: other.email, password: other.password }, format: :json
      end

      it "should respond with a 403 status" do
        expect(response).to have_http_status(403)
      end

      it "should return the correct message" do
        expect(JSON.parse(response.body)["message"]).to eq("You are already logged in")
      end
    end

    context "when no user is logged in" do
      context "creating a valid user" do

        before(:each) do
          post :create, user: { email: user.email, password: user.password }, format: :json
        end

        it "should respond with a 200 status" do
          expect(response).to have_http_status(200)
        end

        it "should create a user" do
          expect(assigns(:user)).to be_persisted
        end

        it "should render the show template" do
          expect(response).to render_template(:show)
        end
      end

      context "creating an invalid user" do

        before(:each) do
          user.password = "bad"
          post :create, user: { email: user.email, password: user.password }
        end

        it "should respond with a 422 status" do
          expect(response).to have_http_status(422)
        end

        it "should not create a user" do
          expect(assigns(:user)).to be_a_new(User)
        end

        it "should return the correct message" do
          expect(JSON.parse(response.body)["message"]).to eq("User wasn't saved")
        end
      end
    end
  end

  describe "#update" do

    before(:each) do
      user.save
    end

    context "when the logged in user updates self" do

      before(:each) do
        allow_any_instance_of(ApplicationController).to receive(:current_user).and_return(user)
        patch :update, id: user.id, user: { id: 999, email: "updated@gmail.com", password: "new_password", created_at: Date.new(2016,5,30) }, format: :json
      end

      it "should respond with a 200 status" do
        expect(response).to have_http_status(200)
      end

      it "should render the show template" do
        expect(response).to render_template(:show)
      end

      it "should update whitelisted attributes" do
        last_update = user.updated_at
        user.reload
        expect(user.email).to eq("updated@gmail.com")
        expect(user.is_password?("new_password")).to be true
        expect(user.updated_at).to_not eq(last_update)
      end

      it "shouldn't update blacklisted attributes" do
        user.reload
        expect(user.created_at).to_not eq(Date.new(2016,5,30))
      end
    end

    context "when no user is logged in" do

      before(:each) do
        allow_any_instance_of(ApplicationController).to receive(:current_user).and_return(nil)
        patch :update, id: user.id, user: { email: "updated@gmail.com", password: "new_password" }, format: :json
      end

      it "should respond with a 401 status" do
        expect(response).to have_http_status(401)
      end

      it "should return the correct message" do
        expect(JSON.parse(response.body)["message"]).to eq("You need to log in first")
      end
    end

    context "when the user being updated is not the current user" do

      before(:each) do
        allow_any_instance_of(ApplicationController).to receive(:current_user).and_return(other)
        patch :update, id: user.id, user: { email: "updated@gmail.com", password: "new_password" }, format: :json
      end

      it "should respond with a 403 status" do
        expect(response).to have_http_status(403)
      end

      it "should return the correct message" do
        expect(JSON.parse(response.body)["message"]).to eq("This is not your account")
      end
    end
  end

  describe "#destroy" do

    before(:each) do
      user.save
    end

    context "when the logged in user destroys self" do

      before(:each) do
        allow_any_instance_of(ApplicationController).to receive(:current_user).and_return(user)
        delete :destroy, id: user.id, format: :json
      end

      it "should respond with a 200 status" do
        expect(response).to have_http_status(200)
      end

      it "should render the show template" do
        expect(JSON.parse(response.body)["message"]).to eq("You're account has been closed")
      end

      it "the user should be destroyed" do
        expect(User.find_by_id(user.id)).to be_nil
      end
    end

    context "when no user is logged in" do

      before(:each) do
        allow_any_instance_of(ApplicationController).to receive(:current_user).and_return(nil)
        patch :update, id: user.id, format: :json
      end

      it "should respond with a 401 status" do
        expect(response).to have_http_status(401)
      end

      it "should return the correct message" do
        expect(JSON.parse(response.body)["message"]).to eq("You need to log in first")
      end
    end

    context "when the user being updated is not the current user" do

      before(:each) do
        allow_any_instance_of(ApplicationController).to receive(:current_user).and_return(other)
        patch :update, id: user.id, format: :json
      end

      it "should respond with a 403 status" do
        expect(response).to have_http_status(403)
      end

      it "should return the correct message" do
        expect(JSON.parse(response.body)["message"]).to eq("This is not your account")
      end
    end
  end

  describe "#unique" do

    context "when no user is logged in" do

      before(:each) do
        allow_any_instance_of(ApplicationController).to receive(:current_user).and_return(nil)
        get :unique, user: { email: user.email }
      end

      it { expect(response).to have_http_status(200) }

      it "should return the correct boolean" do
        expect(response.body).to eq("true")
        user.save
        get :unique, user: { email: user.email }
        expect(response.body).to eq("false")
      end
    end

    context "when a user is already logged in" do

      before(:each) do
        allow_any_instance_of(ApplicationController).to receive(:current_user).and_return(user)
        get :unique, user: { email: user.email }
      end

      it { expect(response).to have_http_status(403) }

      it "should return the correct message" do
        expect(JSON.parse(response.body)["message"]).to eq("You are already logged in")
      end
    end
  end
end
