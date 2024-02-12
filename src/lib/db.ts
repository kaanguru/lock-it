import { z } from 'zod';
import Dexie, { type Table } from 'dexie';

// Schema and interfaces
export const _computerSchema = z.object({
	name: z.string().min(2, { message: 'Computer needs longer name' }),
	ipAddress: z.string().ip().nullable()
});
export interface Computer {
	id?: number;
	name: string;
	ipAddress?: string | null;
	macAddress?: string | null;
	memory?: number | null;
	processor?: string | null;
	motherBoard?: string | null;
	windowsVersion?: string | null;
	installationDate?: Date | null;
	monitor?: string | null;
	videoAdaptor?: string | null;
	disk1?: string | null;
	disk2?: string | null;
	removeConnectionSoftware?: string | null;
	remoteConnectionId?: string | null;
	remoteConnectionPass?: string | null;
	officeLocationId?: number | null;
	notes?: string | null;
	softwareIDs?: number[] | null;
	printerIDs?: number[] | null;
}

// Database class
export class LockITDatabase extends Dexie {
	computers!: Table<Computer>;
	constructor() {
		super('LockITDatabase');
		this.version(1).stores({
			computers: '++id, name',
		});
		this.computers = this.table('computers');
	}
}
// CRLUD operations
export async function addComputer(d: Computer) {
  try {
    await db.computers.add({
      name: d.name,
      ipAddress: d.ipAddress
    });
  } catch (error) {
    console.log(error);
  }
}
export const db = new LockITDatabase();