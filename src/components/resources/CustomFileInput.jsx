import React, { useState, useRef, useEffect } from 'react';
import { Button } from 'antd';
import { CloudUploadOutlined } from '@ant-design/icons';
import { api } from "../../../src/utilities/axios-gateway";
import { LoadingSwal } from './swal/LoadingSwal';
import createSwal from './swal/CreateSwalAlert';
import Swal from "sweetalert2";

const Toast = createSwal();

const CustomFileInput = ({ onChange, rowIndex, formData, setFormData, modalTitle, trigger, setTrigger }) => {
    const [files, setFiles] = useState(formData[rowIndex]?.filepond || []);
    const fileInputRef = useRef(null);

    useEffect(() => {
        // Clean up files on component unmount or when new files are passed
        return () => {
            setFiles([]);
        };
    }, []);

    useEffect(() => {
        if (trigger) {
            console.log('trigger useffect', trigger)
            handleClearFiles()
        }
    }, [trigger]);

    const handleFileChange = (event) => {


        let selectedFiles = event.target.files;

        console.log('selectedFiles', selectedFiles);
        const fileList = Array.from(selectedFiles).map((file) => ({
            name: file.name,
            file: file,
        }));

        const formData = new FormData();
        Array.from(selectedFiles).forEach((file, index) => {
            formData.append(`filepond[${index}]`, file);
        });

        // Display loading spinner or indicator
        const swal = Swal.fire(LoadingSwal);

        api.post("/project-plan/upload-temporary-files", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .then(function (response) {
                setFiles([])
                console.log('Response:', response);
                // Close loading indicator
                swal.close();

                // Update files state
                setFiles(fileList);

                // Pass response data to parent component
                onChange(response.data); // Assuming response.data is an array

                // Reset file input value to prevent same files from re-triggering the event
                if (fileInputRef.current) {
                    fileInputRef.current.value = null;
                }

            })
            .catch(function (error) {
                // Handle error
                swal.close();
                console.error('Error:', error);
                var errors = Object.values(error.response.data.errors).map(value => `<li>${value}</li>`).join("");
                Toast.fire({
                    icon: "error",
                    title: "Error",
                    html: errors,
                });
            });

        setTrigger(false)
    };

    const handleRemoveFile = (index) => {
        const updatedFiles = [...files];
        updatedFiles.splice(index, 1); // Remove the file at the specified index
        setFiles(updatedFiles);

        // Update the formData state for the specific rowIndex
        const updatedFormData = [...formData];

        let filepondArray;

        console.log('modalTitle', modalTitle)

        if (modalTitle === "Update Project Plan - PDF") {
            console.log('dio pumasok update')
            filepondArray = [...formData[rowIndex].file];
        }

        if (modalTitle === "Import Project Plan - PDF") {
            console.log('dio pumasok insert')
            filepondArray = [...formData[rowIndex].filepond];
        }

        console.log('filePondArray===', filepondArray)

        filepondArray.splice(index, 1);
        updatedFormData[rowIndex] = {
            ...updatedFormData[rowIndex],
            filepond: filepondArray,
        };
        setFormData(updatedFormData);
    };

    const handleClearFiles = () => {
        console.log('trigger handle clear function', trigger)
        setFiles([]);

        // Clear the files in the parent formData state for the specific rowIndex
        const updatedFormData = [...formData];
        updatedFormData[rowIndex] = {
            ...updatedFormData[rowIndex],
            filepond: [],
        };
        setFormData(updatedFormData);
    };

    const handleBrowseClick = () => {
        fileInputRef.current.click(); // Programmatically trigger the file input
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <input
                type="file"
                accept=".pdf,.doc,.docx,.xls,.xlsx"
                multiple
                onChange={handleFileChange}
                style={{ display: 'none' }}
                ref={fileInputRef} // Reference to the file input element
            />
            <Button onClick={handleBrowseClick} style={{ marginBottom: 8 }}>
                <CloudUploadOutlined /> Browse
            </Button>
            {files.map((file, index) => (
                <div key={index} style={{ marginBottom: 8 }}>
                    {file.name}{' '}
                    <Button type="link" onClick={() => handleRemoveFile(index)}>
                        Remove
                    </Button>
                </div>
            ))}
            {files.length > 0 && (
                <Button type="link" onClick={handleClearFiles}>
                    Clear All
                </Button>
            )}
        </div>
    );
};

export default CustomFileInput;
