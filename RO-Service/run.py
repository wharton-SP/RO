from app import create_app
"""
This script serves as the entry point for running the Flask application.
Modules:
    app (module): Imports the `create_app` function to initialize the Flask application.
Functions:
    create_app: A factory function that creates and configures the Flask application instance.
Attributes:
    app: The Flask application instance created by the `create_app` function.
Execution:
    When executed as the main program, this script runs the Flask application on host `0.0.0.0` 
    and port `4321` with debug mode enabled.
Usage:
    To start the application, run this script directly:
        python run.py
"""

app = create_app()

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=4321, debug=True)
    
# # This is a simple Flask application that returns "Hello, Flask!" when accessed at the root URL.
# # To run this application, save it as app.py and execute it using the command:
# # python app.py
# # Make sure you have Flask installed in your Python environment. You can install it using pip:
# # pip install Flask
# # After running the application, you can access it in your web browser at: