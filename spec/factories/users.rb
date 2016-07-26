FactoryGirl.define do
  factory :user do
    email { Faker::Internet.email }
    password "password"
    association :profile, factory: :user_profile
  end
end
