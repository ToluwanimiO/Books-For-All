import { ref } from 'vue'

export default function useFileSystem() {
    const files = ref<UploadableFile[]>([])

    const addFiles = (newFiles: any) => {
        let newUploadableFiles = [...newFiles]
            .map((file) => new UploadableFile(file))
            .filter((file) => !fileExists(file.id))
        files.value = files.value.concat(newUploadableFiles)
    }

    const fileExists = (otherId: any) => {
        return files.value.some(({ id }: { id: any }) => id === otherId)
    }

    const removeFile = (file: any) => {
        const index = files.value.indexOf(file)

        if (index > -1) files.value.splice(index, 1)
    }

    const formatFileSize = (bytes: number, si = false, dp = 1) => {
        const thresh = si ? 1000 : 1024;

        if (Math.abs(bytes) < thresh) {
            return bytes + ' B';
        }

        const units = si
            ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
            : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
        let u = -1;
        const r = 10 ** dp;

        do {
            bytes /= thresh;
            ++u;
        } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);


        return bytes.toFixed(dp) + ' ' + units[u];
    }

    return { files, addFiles, removeFile, formatFileSize }
}

class UploadableFile {
    file: File;
    id: any;
    url: string;
    status?: any;

    constructor(file: any) {
        this.file = file
        this.id = `${file.name}-${file.size}-${file.lastModified}-${file.type}`
        this.url = URL.createObjectURL(file)
        this.status = null
    }
}