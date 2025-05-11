import mongoose, { Types } from 'mongoose';
import { User } from '../../domain/entities/User';
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { UserRole } from '../../domain/enums/UserRole';
import { UserModel } from '../database/mongo/model/userModel';

export class UserRepository implements IUserRepository {
  async findById(id: string): Promise<User | null> {
    const user = await UserModel.findById(id).lean();
    return user ? this.mapToUser(user) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await UserModel.findOne({ email }).lean();
    return user ? this.mapToUser(user) : null;
  }

  async create(user: Partial<User>): Promise<User> {
    const newUser = await UserModel.create(user);
    return this.mapToUser(newUser.toObject());
  }

  async update(id: string, user: Partial<User>): Promise<User | null> {
    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      { ...user, updatedAt: new Date() },
      { new: true }
    ).lean();

    return updatedUser ? this.mapToUser(updatedUser) : null;
  }

  async findByRole(role: UserRole): Promise<User[]> {
    const users = await UserModel.find({ role }).lean();
    return users.map(user => this.mapToUser(user));
  }

  async findPendingManagers(): Promise<User[]> {
    const managers = await UserModel.find({
      role: UserRole.MANAGER,
      isApproved: false
    }).lean();

    return managers.map(manager => this.mapToUser(manager));
  }

  async assignEmployeesToManager(managerId: string, employeeId: string): Promise<User> {
  
    const employeeObjectId = new mongoose.Types.ObjectId(employeeId);
  
    const updatedManager = await UserModel.findByIdAndUpdate(
      managerId,
      {
        $addToSet: { employees: employeeObjectId },  
      },
      { new: true }  
    ).exec();
  
  
    return this.mapToUser(updatedManager); 
  }
  
  

  private mapToUser(user: any): User {
    return {
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      passwordHash: user.passwordHash,
      role: user.role,
      gender: user.gender,
      otp: user.otp,
      otpExpiry: user.otpExpiry,
      isApproved: user.isApproved,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };
  }
}
