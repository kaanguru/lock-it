import * as R from 'rambda'; // Ramda library for functional programming

export class PrepareForExportThenSave {
	private tableToExport;

	constructor(tableToExport) {
		this.tableToExport = tableToExport;
	}
	async handleExport() {
		const fileName = `computers_${new Date().toISOString().slice(0, 10).replace(/:/g, '-')}.json`;
		const createUrl = R.pipe(R.always(this.tableToExport), this.createJsonBlob, (promiseBlob) =>
			promiseBlob.then((blob: Blob) => URL.createObjectURL(blob))
		);
		const url = await createUrl();

		await this.downloadFileThenClean(url, fileName);
	}
	private async createJsonBlob(data) {
		return new Promise((resolve) => {
			const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
			resolve(blob);
		});
	}

	private downloadFileThenClean(url, filename) {
		const downloadLink = this.createDownloadLink(url, filename);
		document.body.appendChild(downloadLink);
		downloadLink.click();
		document.body.removeChild(downloadLink);
		URL.revokeObjectURL(url);
	}

	private createDownloadLink(url, filename) {
		const link = document.createElement('a');
		link.href = url;
		link.download = filename;
		return link;
	}
}
