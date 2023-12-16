// main.js
new Vue({
    el: '#app',
    data: {
        toEmail: '',
        subject: '',
        body: '',
        senderEmail: '',
        senderPassword: '',
        filePath: '', // New data property for file path
        numEmails: 1
    },
    methods: {
        async sendEmail() {
            const toEmail = this.toEmail;
            
            const subject = this.subject;
            const body = this.body;
            const senderEmail = this.senderEmail;
            const senderPassword = this.senderPassword;
            const numEmails = this.numEmails;
            const fileInput = this.$refs.fileInput;
            
            const filePath = this.filePath || fileInput.value;
            
            
            if (isNaN(numEmails) || numEmails < 1) {
                alert('Please enter a valid number of emails.');
                return;
            }

            for (let i = 0; i < numEmails; i++) {
                try {
                    const response = await eel.send_email(
                        toEmail,
                        subject,
                        body,
                        senderEmail,
                        senderPassword,
                        filePath
                    )();
                    alert(response);
                } catch (error) {
                    console.error(error);
                    alert('An error occurred while sending the email.');
                }
            }
        },

        handleFileChange(event) {
            // Assuming you have a reference to the file input using `ref="fileInput"`
            const fileInput = this.$refs.fileInput;
           
      
            // Assuming the file input has files and the first file is the selected one
            const selectedFile = fileInput.files[0];
            
            // Update the filePath property with the path of the selected file
            if (selectedFile) {
                
                this.filePath = "\\" + selectedFile.name;
            } else {
              this.filePath = ''; // No file selected, clear the filePath
            }
            
          },
    }
});