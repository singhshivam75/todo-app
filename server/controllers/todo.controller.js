import Todo from "../models/task.model.js";
import { ERROR, SUCCESS } from "../utils/messages.js";
import { getPagination, getPagingData } from "../utils/pagination.js";
import { successResponse, errorResponse } from "../utils/response.js";
import { StatusCodes } from "http-status-codes"

export const createTask = async (req, res) => {
  try {
    const todo = await Todo.create(req.body);
    return successResponse(res, SUCCESS.TASK_CREATED, todo);
  } catch (error) {
    return errorResponse(res, error.message, StatusCodes.BAD_REQUEST);
  }
}

export const getAllTask = async (req, res) => {
  try {
    const { page, limit } = req.body;
    const {limit: pageSize, offset, pageNumber}= getPagination(page, limit);

    const data = await Todo.findAndCountAll({ 
      order: [[ "createdAt", "DESC" ]],
      limit: pageSize,
      offset
     });

    if (!data.rows.length) {
      return errorResponse(res, ERROR.TASK_NOT_FOUND, StatusCodes.NOT_FOUND);
    }

    const response = getPagingData(data, pageNumber, pageSize);

    return successResponse(res, SUCCESS.TASKS_FETCHED, response);
  } catch (error) {
    return errorResponse(res, ERROR.INTERNAL_SERVER_ERROR, StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

export const getTaskById = async (req, res) => {
  try {
    const todo = await Todo.findByPk(req.params.id);
    if (!todo) {
      return errorResponse(res, ERROR.TASK_NOT_FOUND, StatusCodes.NOT_FOUND);
    }
    return successResponse(res, SUCCESS.TASK_FETCHED, todo);
  } catch (error) {
    return errorResponse(res, ERROR.INTERNAL_SERVER_ERROR, StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

export const updateTask = async (req, res) => {
  try {
    const todo = await Todo.findByPk(req.params.id);
    if (!todo) {
      return errorResponse(res, ERROR.TASK_NOT_FOUND, StatusCodes.NOT_FOUND)
    }
    await todo.update(req.body);
    return successResponse(res, SUCCESS.TASK_UPDATED, todo);
  } catch (error) {
    return errorResponse(res, error.message, StatusCodes.BAD_REQUEST)
  }
}

export const deleteTask = async (req, res) => {
  try {
    const todo = await Todo.findByPk(req.params.id);
    if (!todo) {
      return errorResponse(res, ERROR.TASK_NOT_FOUND, StatusCodes.NOT_FOUND)
    }
    await todo.destroy();
    return successResponse(res, SUCCESS.TASK_DELETED, todo)
  } catch (error) {
    return errorResponse(res, ERROR.INTERNAL_SERVER_ERROR, StatusCodes.INTERNAL_SERVER_ERROR)
  }
}