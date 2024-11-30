# GMeet Transcription Extension

GMeet Transcription Extension is a browser extension designed to capture and manage live captions from Google Meet sessions. It provides users with a real-time transcript, displayed directly in the extension popup, and allows them to download the transcript as a `.txt` file for later use.

Make sure to have live captions in your google meet call turned on!

## Features
- Real-time transcription of Google Meet captions.
- Displays the transcript in a user-friendly interface.
- Allows downloading the transcript as a `.txt` file.
- Tracks speakers' names and timestamps for better organization.
- Persistent state management, ensuring recording progress isn't lost when the popup is closed.

## How It Works
1. **Start Recording**:
   - Click the "Start" button in the extension popup.
   - Join a Google Meet session and enable captions.
   - The extension will capture subtitles and display them in the popup.

2. **View Transcript**:
   - Open the popup at any time to view the live transcript.

3. **Stop Recording**:
   - Click the "Stop" button to finalize the transcript.
   - The full transcript will be displayed in the popup.

4. **Download Transcript**:
   - Use the "Download" button to save the transcript as a `.txt` file.

## Installation
1. Clone this repository:
   ```bash
   git clone https://github.com/tgcohce/gmeet-transcription-extension.git
   cd gmeet-transcription-extension
   ```

2. Load the extension into your browser:
   - **Chrome**:
     1. Go to `chrome://extensions`.
     2. Enable **Developer Mode**.
     3. Click **Load unpacked** and select the project folder.
   - **Firefox**:
     1. Go to `about:debugging#/runtime/this-firefox`.
     2. Click **Load Temporary Add-on** and select `manifest.json` from the project folder.

## File Structure
- `manifest.json`: Extension configuration and permissions.
- `popup.html`: User interface for the extension popup.
- `popup.js`: Handles popup interactions and displays the transcript.
- `content.js`: Captures live captions from Google Meet.
- `background.js`: (Optional) Background script for additional functionality.
- `icon.png`: Icon for the extension.


## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any feature requests or bugs.

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

## Disclaimer
This extension is not affiliated with or endorsed by Google. Use at your own risk.
