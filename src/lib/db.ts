import { z } from 'zod';
import Dexie, { type Table } from 'dexie';

// Schema and interfaces
export const _computerSchema = z.object({
	id: z.number().optional(),
	name: z.string().min(3, { message: 'Computer needs longer name' }),
	ipAddress: z.string().ip().nullable(),
	macAddress: z.string().nullable(),
	memory: z.number().nullable(),
	processor: z.string().nullable(),
	motherBoard: z.string().nullable(),
	windowsVersion: z.string().nullable(),
	installationDate: z.date().nullable(),
	monitor: z.string().nullable(),
	videoAdaptor: z.string().nullable(),
	disk1: z.string().nullable(),
	disk2: z.string().nullable(),
	removeConnectionSoftware: z.string().nullable(),
	remoteConnectionId: z.string().nullable(),
	remoteConnectionPass: z.string().nullable(),
	officeLocationId: z.number().nullable(),
	notes: z.string().nullable(),
	softwareIDs: z.array(z.number()).nullable(),
	printerIDs: z.array(z.number()).nullable()
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
			computers: '++id, name, ipAddress, &macAddress, &remoteConnectionId'
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
