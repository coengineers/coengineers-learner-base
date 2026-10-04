import { normaliseDisplayName } from "../domain/profile";
export interface ProfileRecord {
  id: string;
  displayName: string;
}
export interface ProfileRepository {
  get(): Promise<ProfileRecord>;
  save(displayName: string): Promise<ProfileRecord>;
}
export function accountService(repository: ProfileRepository) {
  return {
    get: () => repository.get(),
    save: (name: string) => repository.save(normaliseDisplayName(name)),
  };
}
