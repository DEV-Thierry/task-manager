using Application.Commands;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Presentation.Controllers;

[ApiController]
[Route("api/[Controller]")]
public class AuthController : ControllerBase
{
    private readonly AuthCommands _authCommands;

    public AuthController(AuthCommands authCommands)
    {
        _authCommands = authCommands;
    }

    [HttpPost("register")]
    public async Task<ActionResult> Register([FromBody] RegisterUserCommand command)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var success = await _authCommands.RegisterAsync(command);

        if (success)
        {
            return Ok(new { Message = "Usuário registrado com sucesso!" });
        }

        return BadRequest(new { Message = "Erro ao registrar usuário. O nome de usuário pode já estar em uso." });
    }

    [HttpPost("login")]
    public async Task<ActionResult<AuthResponse>> Login([FromBody] LoginUserCommand command)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var response = await _authCommands.LoginAsync(command);

        if (response == null)
        {
            return Unauthorized(new { Message = "Usuário ou senha invalidos." });
        }

        return new JsonResult(response)
        {
            StatusCode = 200 // Retorna um status HTTP 200 OK
        };
    }
}
