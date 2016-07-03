require 'rails_helper'

RSpec.describe 'api/users/show.json.jbuilder' do

  subject(:user) { FactoryGirl.build(:user, id: Faker::Number.number(1)) }

  before(:each) do
    assign(:user, user)
    render
  end

  it "displays the user's id" do
    expect(rendered).to have_node(:id).with(user.id)
  end

  it "displays the user's email" do
    expect(rendered).to have_node(:email).with(user.email)
  end

  it "does not display the user's password" do
    expect(rendered).to_not have_node(:password).with(user.password)
  end

  it "does not display the user's password digest" do
    expect(rendered).to_not have_node(:password_digest).with(user.password)
  end

  it "does not display the user's session token" do
    expect(rendered).to_not have_node(:session_token).with(user.session_token)
  end

end
