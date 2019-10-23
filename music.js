//Song Class: Represents a book
class Song {
    constructor(artist, title, album, genre) {
      this.artist = artist;
      this.title = title;
      this.album = album;
      this.genre = genre;
    }
  }
  
  // UI Class: Handle UI Tasks
  class UI {
    static displaySongs() {
      const songs = Store.getSongs();
  
      songs.forEach((song) => UI.addSongToList(song));
    }
  
    static addSongToList(song) {
      const list = document.querySelector('#song-list');
  
      const row = document.createElement('tr');
  
      row.innerHTML = `
        <td>${song.artist}</td>
        <td>${song.title}</td>
        <td>${song.album}</td>
        <td>${song.genre}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
      `;
  
      list.appendChild(row);
    }
  
    static deleteSong(el) {
      if(el.classList.contains('delete')) {
        el.parentElement.parentElement.remove();
      }
    }
  
    static showAlert(message, className) {
      const div = document.createElement('div');
      div.className = `alert alert-${className}`;
      div.appendChild(document.createTextNode(message));
      const container = document.querySelector('.container');
      const form = document.querySelector('#song-form');
      container.insertBefore(div, form);
  
      //Set a time out so that remove alert disapears in 3 seconds
      setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }
  
    static clearFields() {
      document.querySelector('#artist').value = '';
      document.querySelector('#title').value = '';
      document.querySelector('#album').value = '';
      document.querySelector('#genre').value = '';
    }
  }
  
  // Store Class: Handles Storage
  class Store {
    static getSongs() {
      let songs;
      if(localStorage.getItem('songs') === null) {
        songs = [];
      } else {
        songs = JSON.parse(localStorage.getItem('songs'));
      }
  
      return songs;
    }
  
    static addSong(song) {
      const songs = Store.getSongs();
      songs.push(song);
      localStorage.setItem('songs', JSON.stringify(songs));
    }
  
    static removeSong(genre) {
      const songs = Store.getSongs();
  
      songs.forEach((song, index) => {
        if(song.genre === genre) {
          songs.splice(index, 1);
        }
      });
  
      localStorage.setItem('songs', JSON.stringify(songs));
    }
  }
  
  // Event: Display Songs onto the webpage
  document.addEventListener('DOMContentLoaded', UI.displaySongs);
  
  // Event: Add a Song
  document.querySelector('#song-form').addEventListener('submit', (e) => {
// Prevent actual submit
    e.preventDefault();
  
    // Get form values
    const artist = document.querySelector('#artist').value;
    const title = document.querySelector('#title').value;
    const album = document.querySelector('#album').value;
    const genre = document.querySelector('#genre').value;
  
    // Validate fields so that the user enters all the info
    if(artist === '' || title === '' || album === '' || genre === '') {
      UI.showAlert('Please fill in all fields', 'warning');
    } else {
      // Instatiate song
      const song = new Song(artist, title, album, genre);
  
      // Add Song to UI
      UI.addSongToList(song);
  
      // Add song to store
      Store.addSong(song);
  
      // Show success message
      UI.showAlert('Song Added To Playlist', 'success');
  
      // Clear fields
      UI.clearFields();
    }
  });
  
  // Event: Remove a Song
  document.querySelector('#song-list').addEventListener('click', (e) => {
    // Remove book from UI
    UI.deleteSong(e.target);
  
    // Remove Song from store
    Store.removeSong(e.target.parentElement.previousElementSibling.textContent);
  
    // Show success message
    UI.showAlert('Song Removed From Playlist', 'danger');
  });