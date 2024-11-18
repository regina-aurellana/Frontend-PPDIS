import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import Cookies from 'js-cookie';

const FilepondUpload = ({ filepond, onUpdateFiles }) => {
  const xsrfToken = Cookies.get('XSRF-TOKEN');
  console.log('XSRF Token:', xsrfToken);

  const handleUpdateFiles = (fileItems) => {
    const fileIds = fileItems.map(fileItem => fileItem.serverId);
    onUpdateFiles(fileIds);
  };

  const processHeaders = {};
  if (xsrfToken) {
    processHeaders['X-Xsrf-Token'] = xsrfToken;
  }

  const revertHeaders = {};
  if (xsrfToken) {
    revertHeaders['X-Xsrf-Token'] = xsrfToken;
  }

  return (
    <FilePond
      files={filepond.map(fileId => ({ source: fileId, options: { type: 'local' } }))} // Initialize FilePond with existing file IDs
      allowMultiple={true} // Allow multiple files per instance
      maxFiles={3} // Maximum number of files
      onupdatefiles={(fileItems) => handleUpdateFiles(fileItems)}
      server={{
        process: {
          url: 'http://localhost:8000/api/upload-material',
          method: 'post',
          headers: processHeaders,
          withCredentials: true,
          onload: (response) => response,
          onerror: (error) => {
            console.error('Server response error:', error);
          },
        },
        revert: {
          url: 'http://localhost:8000/api/revert-material',
          method: 'delete',
          headers: revertHeaders,
          withCredentials: true,
        },
      }}
    />
  );
};

export default FilepondUpload;
