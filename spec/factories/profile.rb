FactoryGirl.define do
  factory :user_profile do
    first_name { Faker::Name.name }
    last_name { Faker::Name.name }
  end
end
