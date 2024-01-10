
using Microsoft.AspNetCore.Mvc;

namespace Controllers;

[ApiController]
[Route("/api/hello-world")]
public class HelloWorld : ControllerBase
{
  [HttpGet]
  public string Get()
  {
    return "Hello World!";
  }
}