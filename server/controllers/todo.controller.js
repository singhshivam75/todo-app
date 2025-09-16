import Todo from "../models/task.schema.js";
import { ERROR, SUCCESS } from "../utils/messages.js";
import { successResponse, errorResponse } from "../utils/response.js";


export const createTask = async (req, res) => {
  try {
    const todo = new Todo(req.body);
    await todo.save()
    return successResponse(res, SUCCESS.TASK_CREATED, todo);
  } catch (error) {
    return errorResponse(res, error.message, 400);
  }
}

export const getAllTask = async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    if (!todos) {
      return errorResponse(res, ERROR.TASK_NOT_FOUND, 404);
    }
    return successResponse(res, SUCCESS.TASKS_FETCHED, todos);
  } catch (error) {
    return errorResponse(res, ERROR.INTERNAL_SERVER_ERROR, 500)
  }
}

export const getTaskById = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return errorResponse(res, ERROR.TASK_NOT_FOUND, 404);
    }
    return successResponse(res, SUCCESS.TASK_FETCHED, todo);
  } catch (error) {
    return errorResponse(res, ERROR.INTERNAL_SERVER_ERROR, 500);
  }
};

export const updateTask = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!todo) {
      return errorResponse(res, ERROR.TASK_NOT_FOUND, 404)
    }
    return successResponse(res, SUCCESS.TASK_UPDATED, todo);
  } catch (error) {
    return errorResponse(res, error.message, 400)
  }
}

export const deleteTask = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) {
      return errorResponse(res, ERROR.TASK_NOT_FOUND, 404)
    }
    return successResponse(res, SUCCESS.TASK_DELETED, todo)
  } catch (error) {
    return errorResponse(res, ERROR.INTERNAL_SERVER_ERROR, 500)
  }
}