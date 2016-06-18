require 'rails_helper'

describe User do
  subject(:user) { FactoryGirl.build(:user) }

  it { should validate_presence_of(:email) }
  it { should validate_uniqueness_of(:email) }

  it { should validate_length_of(:password).is_at_least(6) }
  it { should validate_presence_of(:password_digest) }


  it { should validate_presence_of(:session_token) }
  it { should validate_uniqueness_of(:session_token) }

  it "should create a password digest when given a password" do
    expect(user.password_digest).to_not be_nil
  end

  it "creates a session token before validation" do
    user.valid?
    expect(user.session_token).to_not be_nil
  end

  describe "#find_by_credentials" do
    before { user.save }

    it "returns a user given correct email and password" do
      expect(User.find_by_credentials(user.email, user.password)).to eq(user)
    end

    it "returns nil given incorrect email or password" do
      expect(User.find_by_credentials(user.email, "not_password")).to be_nil
    end
  end

  describe "#is_password?" do
    it "verifies that a password is correct" do
      expect(user.is_password?("password")).to be true
    end

    it "verifies that a password is incorrect" do
      expect(user.is_password?("not_password")).to be false
    end
  end

  describe "#reset_session_token!" do
    it "changes the user's session token" do
      user.valid?
      old_token = user.session_token
      user.reset_session_token!

      expect(user.session_token).to_not eq(old_token)
    end

    it "returns a new session token" do
      expect(user.reset_session_token!).to eq(user.session_token)
    end
  end

end
