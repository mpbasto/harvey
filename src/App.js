import React, { Component } from 'react';
import Particles from "react-tsparticles";
import Navigation from './components/Navigation/Navigation';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Rank from './components/Rank/Rank';
import './App.css';


const particlesOptions = {
  fps_limit: 60,
  interactivity: {
    detect_on: "canvas",
    events: {
      onclick: { enable: true, mode: "repulse" },
      onhover: {
        enable: true,
        mode: "bubble",
        parallax: { enable: false, force: 2, smooth: 10 }
      },
      resize: true
    },
    modes: {
      bubble: { distance: 250, duration: 2, opacity: 0, size: 0, speed: 3 },
      grab: { distance: 400, line_linked: { opacity: 1 } },
      push: { particles_nb: 4 },
      remove: { particles_nb: 2 },
      repulse: { distance: 400, duration: 0.4 }
    }
  },
  particles: {
    color: { value: "#ffffff" },
    line_linked: {
      color: "#ffffff",
      distance: 150,
      enable: false,
      opacity: 0.4,
      width: 1
    },
    move: {
      size: true,
      attract: { enable: false, rotateX: 600, rotateY: 600 },
      bounce: false,
      direction: "none",
      enable: true,
      out_mode: "out",
      random: true,
      speed: 0.3,
      straight: false
    },
    number: { density: { enable: true, value_area: 800 }, value: 160 },
    opacity: {
      anim: { enable: true, opacity_min: 0, speed: 1, sync: false },
      random: true,
      value: 1
    },
    shape: {
      character: {
        fill: false,
        font: "Verdana",
        style: "",
        value: "*",
        weight: "400"
      },
      image: {
        height: 100,
        replace_color: true,
        src: "images/github.svg",
        width: 100
      },
      polygon: { nb_sides: 5 },
      stroke: { color: "#000000", width: 0 },
      type: "circle"
    },
    size: {
      anim: { enable: false, size_min: 0.3, speed: 4, sync: false },
      random: true,
      value: 3
    }
  },
  polygon: {
    draw: { enable: false, lineColor: "#ffffff", lineWidth: 0.5 },
    move: { radius: 10 },
    scale: 1,
    type: "none",
    url: ""
  },
  retina_detect: true
}

const initialState = {
  input: '',
  image_url: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
  }


  calcFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('input_img');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),
    }
  }

  displayFaceBox = (box) => {
    this.setState({ box: box });
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onBtnSubmit = () => {
    this.setState({ image_url: this.state.input });
    fetch('https://ancient-scrubland-94621.herokuapp.com/imageURL', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('https://ancient-scrubland-94621.herokuapp.com/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count }))
            })
            .catch(console.log)
        }
        this.displayFaceBox(this.calcFaceLocation(response))
      })
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({ isSignedIn: true })
    }
    this.setState({ route: route });
  }

  render() {
    const { isSignedIn, image_url, route, box } = this.state;
    const particlesInit = (main) => {
      console.log(main);
    };

    const particlesLoaded = (container) => {
      console.log(container);
    };
    return (
      <div className="App" >
        <Particles className="particles" init={particlesInit}
          loaded={particlesLoaded}
          params={particlesOptions} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        {route === 'home'
          ? <>
            <Logo />
            <Rank name={this.state.user.name} entries={this.state.user.entries} />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onBtnSubmit={this.onBtnSubmit} />
            <FaceRecognition box={box} image_url={image_url} />
          </>
          : (
            route === 'signin'
              ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
              : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          )
        }
        <br />
      </div>
    );
  }
}

export default App;
