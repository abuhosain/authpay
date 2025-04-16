import { describe, it, expect, vi, beforeEach } from "vitest";  
import { User } from "./user.model";
import { UserServices } from "./user.service";
import AppError from "../../errors/AppError";

vi.mock("./user.model", () => ({
  User: {
    findOne: vi.fn(),
    create: vi.fn(),
  },
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

describe("signUpUserIntoDb", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

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
