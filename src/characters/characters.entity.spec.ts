import { Character } from './characters.entity';

describe('Character', () => {
  it('should be defined', () => {
    expect(new Character()).toBeDefined();
  });
});
