import { describe, it, expect, vi, beforeEach } from "vitest";
import { User } from "./user.model";
import { UserServices } from "./user.service";
import AppError from "../../errors/AppError"; 
import { createToken } from "./user.utils";

// Mocks
vi.mock("./user.model", () => ({
  User: {
    findOne: vi.fn(),
    create: vi.fn(),
    isUserExistsByEmail: vi.fn(),
    isUserPasswordMatch: vi.fn(),
  },
}));

vi.mock("./user.utils", () => ({
  createToken: vi.fn(),
}));

const mockUserPayload = {
  name: "Test User",
  email: "test@example.com",
  role: "user" as "user" | "admin",
  password: "password123",
  username: "testuser",
  needsPasswordChange: false,
  isDeleted: false,
  isBlocked: false,
};

describe("UserServices", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("signUpUserIntoDb", () => {
    it("should throw an error if user already exists", async () => {
      (User.findOne as any).mockResolvedValue({ email: mockUserPayload.email });

      await expect(UserServices.signUpUserIntoDb(mockUserPayload)).rejects.toThrow(AppError);
      await expect(UserServices.signUpUserIntoDb(mockUserPayload)).rejects.toThrow("This email is already taken");

      expect(User.findOne).toHaveBeenCalledWith({ email: mockUserPayload.email });
      expect(User.create).not.toHaveBeenCalled();
    });

    it("should create and return user if email is not taken", async () => {
      (User.findOne as any).mockResolvedValue(null);
      (User.create as any).mockResolvedValue(mockUserPayload);

      const result = await UserServices.signUpUserIntoDb(mockUserPayload);

      expect(User.findOne).toHaveBeenCalledWith({ email: mockUserPayload.email });
      expect(User.create).toHaveBeenCalledWith(mockUserPayload);
      expect(result).toEqual(mockUserPayload);
    });
  });

  describe("loginUser", () => {
    const payload = {
      email: mockUserPayload.email,
      password: mockUserPayload.password,
    };

    it("should throw error if user is not found", async () => {
      (User.isUserExistsByEmail as any).mockResolvedValue(null);

      await expect(UserServices.loginUser(payload)).rejects.toThrow(AppError);
      await expect(UserServices.loginUser(payload)).rejects.toThrow("This user is not found");

      expect(User.isUserExistsByEmail).toHaveBeenCalledWith(payload.email);
    });

    it("should throw error if user is deleted", async () => {
      (User.isUserExistsByEmail as any).mockResolvedValue({
        ...mockUserPayload,
        isDeleted: true,
      });

      await expect(UserServices.loginUser(payload)).rejects.toThrow("This user is deleted");
    });

    it("should throw error if user is blocked", async () => {
      (User.isUserExistsByEmail as any).mockResolvedValue({
        ...mockUserPayload,
        isBlocked: true,
      });

      await expect(UserServices.loginUser(payload)).rejects.toThrow("This user is blocked");
    });

    it("should throw error if password does not match", async () => {
      (User.isUserExistsByEmail as any).mockResolvedValue(mockUserPayload);
      (User.isUserPasswordMatch as any).mockResolvedValue(false);

      await expect(UserServices.loginUser(payload)).rejects.toThrow("Incorrect password");
    });

    it("should return tokens and user info on successful login", async () => {
      (User.isUserExistsByEmail as any).mockResolvedValue(mockUserPayload);
      (User.isUserPasswordMatch as any).mockResolvedValue(true);

      (createToken as any).mockReturnValueOnce("mockAccessToken").mockReturnValueOnce("mockRefreshToken");

      const result = await UserServices.loginUser(payload);

      expect(result).toEqual({
        accessToken: "mockAccessToken",
        refreshToken: "mockRefreshToken",
        needsPasswordChange: false,
      });

      expect(createToken).toHaveBeenCalledTimes(2);
    });
  });
});
