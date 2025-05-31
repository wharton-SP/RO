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
    print("Data received:", data)
    print("Type of data:", type(data))
    graph_data = data["graph"] if isinstance(data, dict) and "graph" in data else data
    result = fordFulkerson(graph_data)
    return jsonify(result)