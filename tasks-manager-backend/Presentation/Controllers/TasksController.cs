using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain.Entities;
using Application.Service;

namespace Presentation.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : ControllerBase
    {
        private readonly TasksService _tasksService;

        public TasksController(TasksService tasksService)
        {
            _tasksService = tasksService;
        }

        [HttpGet]
        public async Task<IActionResult> GetTasks([FromQuery] string filter = null)
        {
            var tasks = await _tasksService.GetTasksByFilterAsync(filter);
            return Ok(tasks);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTask(Guid id)
        {
            try
            {
                var task = await _tasksService.GetTaskByIdAsync(id);
                return Ok(task);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { Message = ex.Message });
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateTask([FromBody] CreateTaskDto createTaskDto)
        {
            try
            {
                var createdTask = await _tasksService.CreateTaskAsync(createTaskDto);
                return CreatedAtAction(nameof(GetTask), new { id = createdTask.Id }, createdTask);
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTask(Guid id, [FromBody] UpdateTaskDto updateTaskDto)
        {
            try
            {
                var updatedTask = await _tasksService.UpdateTaskAsync(id, updateTaskDto);
                return Ok(updatedTask);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { Message = ex.Message });
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }

        [HttpPatch("{id}/toggle-status")]
        public async Task<IActionResult> ToggleTaskStatus(Guid id)
        {
            try
            {
                var updatedTask = await _tasksService.ToggleTaskStatusAsync(id);
                return Ok(updatedTask);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { Message = ex.Message });
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(Guid id)
        {
            try
            {
                await _tasksService.DeleteTaskAsync(id);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { Message = ex.Message });
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }
    }
}
