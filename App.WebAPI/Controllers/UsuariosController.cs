﻿using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Domain.Models;
using Application.Interfaces;
using Application.Input;
using Microsoft.AspNetCore.Authorization;
using System.Threading.Tasks;
using Application.ViewModels;

namespace App.WebAPI.Controllers
{
    /// <summary>
    /// Controller para operações de usuarios
    /// </summary>
    [Authorize(Policy = "Administradores")]
    [Route("api/[controller]")]
    public class UsuariosController : BaseController
    {
        private IUsuarioApplicationService _appService { get; }

        /// <summary>
        /// Construtor
        /// </summary>
        /// <param name="appService">Serviço de aplicação (injetado)</param>
        public UsuariosController(IUsuarioApplicationService appService)
        {
            _appService = appService;
        }

        /// <summary>
        /// Obtém uma lista de usuarios utilizando paginação
        /// </summary>
        /// <param name="pagina">Página atual</param>
        /// <param name="porPagina">Quantidade de itens por página</param>
        /// <returns><see cref="IList{Usuario}"/></returns>
        [HttpGet]
        [ProducesResponseType(typeof(IList<Usuario>), 200)]
        public async Task<IActionResult> Get(int pagina, int porPagina)
        {
            return Ok(await _appService.ListarTodos(pagina, porPagina));
        }

        /// <summary>
        /// Obtém um usuario informando o ID
        /// </summary>
        /// <param name="id">ID do usuario</param>
        /// <returns><see cref="Usuario"/></returns>
        [HttpGet]
        [Route("{id}", Name = "GetUsuarioById")]
        [ProducesResponseType(typeof(Usuario), 200)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> Get(int id)
        {
            return Ok(await _appService.Obter(id));
        }

        /// <summary>
        /// Insere um novo usuario
        /// </summary>
        /// <param name="usuario"><see cref="UsuarioInput"/></param>
        /// <returns></returns>
        [HttpPost]
        [ProducesResponseType(typeof(UsuarioViewModel), 201)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> Post([FromBody] UsuarioInput usuario)
        {
            var u = await _appService.Adicionar(usuario);
            return CreatedAtRoute("GetUsuarioById", new { id = u.Id }, u);
        }

        /// <summary>
        /// Altera informações de um usuario
        /// </summary>
        /// <param name="id">Identificação do usuario</param>
        /// <param name="usuario"><see cref="UsuarioInput"/></param>
        /// <returns></returns>
        [HttpPut("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> Put(int id, [FromBody]UsuarioInput usuario)
        {
            await _appService.Atualizar(id, usuario);
            return Ok();
        }

        /// <summary>
        /// Exclui um Usuario
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> Delete(int id)
        {
            await _appService.Excluir(id);
            return Ok();
        }
    }
}
