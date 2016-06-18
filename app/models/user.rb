class User < ActiveRecord::Base
  has_one :profile, class_name: 'UserProfile'
  # build_profile not profile.new

  attr_reader :password

  after_initialize :ensure_session_token

  validates :email, :password_digest, :session_token, presence: true
	validates :password, length: { minimum: 6, allow_nil: true }
	validates :session_token, :email, uniqueness: true

  def self.find_by_credentials(email, password)
		user = User.find_by(email: email)
		user.try(:is_password?, password) ? user : nil
	end

	def is_password?(unencrypted_password)
		BCrypt::Password.new(self.password_digest).is_password?(unencrypted_password)
	end
  
	def password=(unencrypted_password)
		if unencrypted_password.present?
			@password = unencrypted_password
			self.password_digest = BCrypt::Password.create(unencrypted_password)
		end
	end

	def reset_session_token!
		self.session_token = self.class.generate_session_token
		self.save!
		self.session_token
	end

	private

	def ensure_session_token
		self.session_token ||= self.class.generate_session_token
	end

  def self.generate_session_token
    token = SecureRandom::urlsafe_base64(16)
    while exists?(session_token: token)
      token = SecureRandom::urlsafe_base64(16)
    end
    token
  end

end
