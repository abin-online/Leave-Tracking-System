/src
  /domain
    /entities
      - User.ts
    /enums
      - UserRole.ts
      - Gender.ts
    /repositories
      - IUserRepository.ts
    /services
      - IAuthService.ts
  /application
    /use-cases
    /user
      - signupUser.ts
      - verifyOtp.ts
      - loginUser.ts
      - signupManager.ts
      - loginManager.ts
      - approveManager.ts
  /infrastructure
    /repositories
      - UserRepository.ts
    /services
      - AuthService.ts (handles OTP gen/verify, hash etc)
  /interface
    /routes
      - authRoutes.ts
    /controllers
      - AuthController.ts
    /middlewares
      - authMiddleware.ts
  index.ts
