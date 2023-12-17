import { userRepository } from '../repositories/userRepository.js';

class UserService {
  // TODO: Implement methods to work with user
  async getAllUsers() {
    return await userRepository.getAll();
  }

  async getUserById(userId) {
    return await userRepository.getOne({ id: userId });
  }

  async createUser(newUser) {
    return await userRepository.create(newUser);
  }

  async updateUser(userId, updatedUser) {
    const existingUser = await userRepository.getOne({ id: userId });

    if (!existingUser) {
      return null;
    }
    const mergedUser = { ...existingUser, ...updatedUser };
    await userRepository.update(userId, mergedUser);

    return mergedUser;
  }

  async deleteUser(userId) {
    const deletedUser = await userRepository.delete(userId);

    if (!deletedUser) {
      return null;
    }

    return deletedUser;
  }

  search(search) {
    const item = userRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }
}

const userService = new UserService();

export { userService };
