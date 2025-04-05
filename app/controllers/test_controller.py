from app.services.test_service import TestService

class TestController:
    @staticmethod
    def get_test_message():
        # Logique métier ici si nécessaire
        message = TestService.get_message()
        return {
            'status': 'success',
            'message': message,
            'data': None
        }
        