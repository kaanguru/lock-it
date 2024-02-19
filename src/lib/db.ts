import { z } from 'zod';
import Dexie, { type Table } from 'dexie';
// eslint-disable-next-line no-useless-escape
const macRegex = /^([0-9A-Fa-f]{2}[\.:\-]{1})+[0-9A-Fa-f]{2}$/;
// Schema and interfaces
export const _computerSchema = z.object({
	id: z.number().optional(),
	name: z.string().min(3, { message: 'Computer needs longer name' }),
	ipAddress: z.string().ip().optional(),
	macAddress: z.string().regex(macRegex).max(17).optional(),
	memory: z.number().optional(),
	processor: z.string().optional(),
	motherBoard: z.string().optional(),
	windowsVersion: z.string().optional(),
	installationDate: z.date().optional(),
	monitor: z.string().optional(),
	videoAdaptor: z.string().optional(),
	disk1: z.string().optional(),
	disk2: z.string().optional(),
	removeConnectionSoftware: z.string().optional(),
	remoteConnectionId: z.string().optional(),
	remoteConnectionPass: z.string().optional(),
	officeLocationId: z.number().optional(),
	notes: z.string().optional(),
	softwareIDs: z.array(z.number()).optional(),
	printerIDs: z.array(z.number()).optional(),
	customFields: z
		.array(
			z.object({
				title: z.string(),
				value: z.string()
			})
		)
		.optional()
});

interface CustomField {
	title: string;
	value: string;
}
export interface Computer {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key: string]: any;
	id?: number | string;
	name: string;
	ipAddress?: string | undefined;
	macAddress?: string | undefined;
	memory?: number | undefined;
	processor?: string | undefined;
	motherBoard?: string | undefined;
	windowsVersion?: string | undefined;
	installationDate?: Date | undefined;
	monitor?: string | undefined;
	videoAdaptor?: string | undefined;
	disk1?: string | undefined;
	disk2?: string | undefined;
	removeConnectionSoftware?: string | undefined;
	remoteConnectionId?: string | undefined;
	remoteConnectionPass?: string | undefined;
	officeLocationId?: number | undefined;
	notes?: string | undefined;
	softwareIDs?: number[] | undefined;
	printerIDs?: number[] | undefined;
	customFields?: CustomField[];
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
export async function addComputer(computer: Computer): Promise<void> {
	try {
		await db.computers.add({
			...computer
		});
	} catch (error) {
		console.error('Error adding computer:', error);
		throw error;
	}
}
export const db = new LockITDatabase();
