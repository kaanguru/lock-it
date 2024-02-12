import { z } from 'zod';
import Dexie, { type Table } from 'dexie';

// Schema and interfaces
export const _userSchema = z.object({
	name: z.string().min(2, { message: 'needs longer name' }),
	email: z.string().email().optional()
});
export interface User {
	id?: number;
	name: string;
	email?: string | null;
}

// Database class
export class AppDatabase extends Dexie {
	users!: Table<User>;
	constructor() {
		super('AppDatabase');
		this.version(1).stores({
			users: '++id, name , &email'
		});
		this.users = this.table('users');
	}
}
// CRLUD operations
export async function addUser(d: User): Promise<number | void> {
  try {
    const id: number = await db.users.add({
      name: d.name,
      email: d.email
    });
    return id;
  } catch (error) {
    console.log(error);
  }
}
export const db = new AppDatabase();