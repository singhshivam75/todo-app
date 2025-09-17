import { Op } from "sequelize";
import Todo from "../models/task.model.js";
import { ERROR, SUCCESS } from "../utils/messages.js";
import { successResponse, errorResponse } from "../utils/response.js";
import { StatusCodes } from "http-status-codes"
import { getPagination, getPagingData } from "../utils/pagination.js";

export const searchTask = async (req, res) => {
  try {
    const { query, page, limit } = req.query;

    if (!query) {
      return errorResponse(res, ERROR.SEARCH_QUERY_REQUIRED, StatusCodes.BAD_REQUEST);
    }

    const { limit: pageSize, offset, pageNumber } = getPagination(page, limit);

    const data = await Todo.findAndCountAll({
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${query}%` } },
          { description: { [Op.like]: `%${query}%` } }
        ],
      },
      limit: pageSize,
      offset
    });

    if (!data.rows.length) {
      return errorResponse(res, ERROR.TASK_NOT_FOUND, StatusCodes.NOT_FOUND);
    }

    const response = getPagingData(data, pageNumber, pageSize);

    return successResponse(res, SUCCESS.TASKS_FETCHED, response, StatusCodes.OK);
  } catch (error) {
    return errorResponse(res, ERROR.INTERNAL_SERVER_ERROR, StatusCodes.INTERNAL_SERVER_ERROR)
  }
};