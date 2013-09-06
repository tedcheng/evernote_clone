require 'bcrypt'

class User < ActiveRecord::Base
  attr_accessible :email, :password, :session_token
  
  has_many :notes
  has_many :notebooks
  has_many :tags
  has_many :tagggins

  def password=(plaintext_password)
    self.password_digest = BCrypt::Password.create(plaintext_password)
  end
  
  def set_session_token
    self.session_token = SecureRandom.urlsafe_base64
  end

  def self.verify_credentials(email, password)
    user = User.find_by_email(email)
    db_password = BCrypt::Password.new(user.password_digest)
    
    user && db_password == password
  end

end
