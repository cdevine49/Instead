# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160818171837) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "addresses", force: :cascade do |t|
    t.string   "street"
    t.string   "town"
    t.string   "state"
    t.integer  "zip_code"
    t.string   "country"
    t.integer  "addressable_id"
    t.string   "addressable_type"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
    t.string   "_type"
  end

  add_index "addresses", ["addressable_type", "addressable_id"], name: "index_addresses_on_addressable_type_and_addressable_id", using: :btree

  create_table "educations", force: :cascade do |t|
    t.string   "school",           null: false
    t.date     "start"
    t.date     "end"
    t.string   "degree"
    t.string   "field"
    t.string   "grade"
    t.text     "extracurriculars"
    t.text     "description"
    t.integer  "user_profile_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "educations", ["user_profile_id"], name: "index_educations_on_user_profile_id", using: :btree

  create_table "photo_joins", force: :cascade do |t|
    t.string   "title"
    t.text     "description"
    t.integer  "photo_id"
    t.integer  "photoable_id"
    t.string   "photoable_type"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "photo_joins", ["photoable_id"], name: "index_photo_joins_on_photoable_id", using: :btree
  add_index "photo_joins", ["photoable_type"], name: "index_photo_joins_on_photoable_type", using: :btree

  create_table "photos", force: :cascade do |t|
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "user_profiles", force: :cascade do |t|
    t.string  "first_name", null: false
    t.string  "last_name",  null: false
    t.string  "about"
    t.integer "user_id"
    t.string  "headline",   null: false
  end

  add_index "user_profiles", ["user_id"], name: "index_user_profiles_on_user_id", unique: true, using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "email",           null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["session_token"], name: "index_users_on_session_token", unique: true, using: :btree

  create_table "work_experiences", force: :cascade do |t|
    t.string   "company",         null: false
    t.string   "position",        null: false
    t.date     "start",           null: false
    t.date     "end"
    t.text     "description"
    t.integer  "user_profile_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "location"
  end

end
