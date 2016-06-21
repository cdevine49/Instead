require 'rails_helper'

RSpec.describe Api::SessionsController, type: :controller do

  it { should use_before_action(:require_logged_out!) }
  it { should use_before_action(:require_logged_in!) }


  describe "#show" do
    subject(:user) { FactoryGirl.build(:user) }

    context "when a user is logged in" do
      before(:each) do
          allow_any_instance_of(ApplicationController).to receive(:current_user).and_return(user)
          get :show
      end

      it "should respond with a 200 status" do
        expect(response.status).to eq(200)
      end

      it "should return the current user's email" do
        expect(response.body).to eq(user.email)
      end
    end

    context "when no user is logged in" do
      before(:each) do
        allow_any_instance_of(ApplicationController).to receive(:current_user).and_return(nil)
        get :show
      end

      it "should respond with a 401 status" do
        expect(response.status).to eq(401)
      end

      it "should return the correct method" do
        expect(JSON.parse(response.body)["message"]).to eq("Please login")
      end
    end
  end

  describe "#create" do

    subject(:user) { FactoryGirl.create(:user) }

    context "when a user is logged in" do
      before(:each) do
        allow_any_instance_of(ApplicationController).to receive(:current_user).and_return(user)
        post :create
      end

      it "should respond with a 401 status" do
        expect(response.status).to eq(401)
      end

      it "should return the correct message" do
        expect(JSON.parse(response.body)["message"]).to eq("You are already logged in")
      end
    end

    context "when no user is logged in" do
      context "creating a valid session" do

        before(:each) do
          post :create, { user: { email: user.email, password: user.password } }
        end

        it "should respond with a 200 status" do
          expect(response.status).to eq(200)
        end

        it "should return the current user's email" do
          expect(response.body).to eq(user.email)
        end
      end

      context "creating an invalid session" do

        before(:each) do
          post :create, { user: { email: user.email, password: 'bad_password' } }
        end

        it "should respond with a 401 status" do
          expect(response.status).to eq(401)
        end

        it "should return the correct method" do
          expect(JSON.parse(response.body)["message"]).to eq("Invalid Username or Password")
        end
      end
    end
  end

  describe "#destroy" do

    subject(:user) { FactoryGirl.create(:user) }

    context "when there is a user logged in" do

      before(:each) do
        allow_any_instance_of(ApplicationController).to receive(:current_user).and_return(user)
        delete :destroy
      end

      it "should respond with a 200 status" do
        expect(response.status).to eq(200)
      end

      it "should return the correct message" do
        expect(JSON.parse(response.body)["message"]).to eq("Logged out")
      end
    end

    context "when there is no user logged in" do

      before(:each) do
        allow_any_instance_of(ApplicationController).to receive(:current_user).and_return(nil)
        delete :destroy
      end

      it "should respond with a 401 status" do
        expect(response.status).to eq(401)
      end

      it "should return the correct message" do
        expect(JSON.parse(response.body)["message"]).to eq("You must be logged in to log out")
      end
    end
  end
end
