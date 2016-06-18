describe User do
  it { should validate_presence_of(:email) }
  it { should validate_uniqueness_of(:email) }

  it { should validate_presence_of(:session_token) }
  it { should validate_uniqueness_of(:session_token) }
end
