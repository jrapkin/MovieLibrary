﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPISample.Data;
using WebAPISample.Models;

namespace WebAPISample.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieController : ControllerBase
    {
        private ApplicationContext _context;
        public MovieController(ApplicationContext context)
        {
            _context = context;
        }
        // GET api/movie
        [HttpGet]
        public IActionResult Get()
        {
            var movies = _context.Movies;
            if (movies == null)
            {
                return BadRequest();
            }
            return Ok(movies);
        }
        // GET api/movie/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var movie = _context.Movies.Where(m => m.MovieId == id).FirstOrDefault();
            if (movie == null)
            {
                return NotFound();
            }
            return Ok(movie);
        }
        // POST api/movie
        [HttpPost]
        public IActionResult Post([FromBody]Movie value)
        {
            // Create movie in db logic
            _context.Movies.Add(value);
            _context.SaveChanges();
            return Ok(value);
        }
        // PUT api/movie
        [HttpPut]
        public IActionResult Put([FromBody] Movie movie)
        {
            if(movie==null)
            { return NotFound(); }
            _context.Movies.Update(movie);
            _context.SaveChanges();
            return Ok(movie);
        }
        // DELETE api/movie/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            Movie movie = _context.Movies.Where(m => m.MovieId == id).FirstOrDefault();
            _context.Movies.Remove(movie);
            _context.SaveChanges();
            return Ok();
        }
    }
}