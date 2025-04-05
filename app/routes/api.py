from flask import Blueprint, jsonify, request
from app.controllers.test_controller import TestController
from app.controllers.ff_controller import fordFulkerson

api_blueprint = Blueprint('api', __name__)

@api_blueprint.route('/test', methods=['GET'])
def test_route():
    result = TestController.get_test_message()
    return jsonify(result)

@api_blueprint.route("/calculate", methods=["POST"])
def calculate_route():
    data = request.get_json()
    
    # edges = 
    
    result = fordFulkerson(data)
    return jsonify(result)