# CNM Group 12 Project

## Team Members:
1. **Nguyễn Hữu Huy** - ID: 20102781
2. **Hồ Hoàng Vân Anh** - ID: 20098521
3. **Trần Quốc Vịnh** - ID: 20001375
4. **Trần Anh Tuấn** - ID: 20001801
5. **Phạm Trung Vĩnh** - ID: 20119821

## Project Overview
This repository hosts the project for CNM Group 12, which is a comprehensive communication platform akin to Zalo. The project is divided into three main components:

- **zalo-mobile:** Mobile application built for user accessibility and convenience.
- **zalo-server:** Backend server for managing API requests, data storage, and business logic.
- **zalo-web:** Web application providing a responsive and user-friendly interface for desktop users.

## Technologies Used
- **Frontend:** JavaScript, SCSS, HTML
- **Backend:** Java, Starlark
- **Mobile:** Objective-C

## Project Structure

cnm-group12/

├── zalo-mobile/

│ ├── src/

│ ├── assets/

│ └── README.md

├── zalo-server/

│ ├── src/

│ ├── config/

│ └── README.md

├── zalo-web/

│ ├── src/

│ ├── public/

│ └── README.md

└── README.md


## Getting Started

### Prerequisites
- **Node.js** (for web and mobile)
- **Java Development Kit (JDK)** (for server)
- **Android/iOS development environment** (for mobile)

### Installation

1. **Clone the repository**
    ```bash
    git clone https://github.com/ChungZinh/cnm-group12.git
    cd cnm-group12
    ```

2. **Setup zalo-mobile**
    - Navigate to the `zalo-mobile` directory
    - Install dependencies and run the application
    ```bash
    cd zalo-mobile
    npm install
    npm start
    ```

3. **Setup zalo-server**
    - Navigate to the `zalo-server` directory
    - Build and run the server
    ```bash
    cd zalo-server
    ./gradlew build
    ./gradlew run
    ```

4. **Setup zalo-web**
    - Navigate to the `zalo-web` directory
    - Install dependencies and run the application
    ```bash
    cd zalo-web
    npm install
    npm start
    ```

## Usage
- **Mobile App:** Use an emulator or a physical device to run the mobile application.
- **Web App:** Access the web interface via `http://localhost:3000`.
- **Server:** The server runs on `http://localhost:8080` by default.

## Contributing
1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

Please make sure to update tests as appropriate.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
