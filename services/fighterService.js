import { fighterRepository } from '../repositories/fighterRepository.js';

class FighterService {
  // TODO: Implement methods to work with fighters
  async getAllFighters() {
    return await fighterRepository.getAll();
  }

  async getFighterById(fighterId) {
    return await fighterRepository.getOne({ id: fighterId });
  }

  async createFighter(newFighter) {
    return await fighterRepository.create(newFighter);
  }

  async updateFighter(fighterId, updatedFighter) {
    const existingFighter = await fighterRepository.getOne({ id: fighterId });

    if (!existingFighter) {
      return null;
    }
    const mergedFighter = { ...existingFighter, ...updatedFighter };
    await fighterRepository.update(fighterId, mergedFighter);

    return mergedFighter;
  }

  async deleteFighter(fighterId) {
    const deletedFighter = await fighterRepository.delete(fighterId);

    if (!deletedFighter) {
      return null;
    }

    return deletedFighter;
  }
}

const fighterService = new FighterService();

export { fighterService };
