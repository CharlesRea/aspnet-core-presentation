import React from "react";

import {
  Appear,
  BlockQuote,
  Cite,
  CodePane,
  Deck,
  Fill,
  Heading,
  Image,
  Layout,
  Link,
  ListItem,
  List,
  Markdown,
  Quote,
  S,
  Slide,
  Spectacle,
  Text
} from "spectacle";

// Import image preloader util
import preloader from "spectacle/lib/utils/preloader";

import createTheme from "spectacle/lib/themes/default";

// Require CSS
require("normalize.css");
require("spectacle/lib/themes/default/index.css");


const images = {
  verticals: require("../assets/verticals.png"),
  dotNetCore: require("../assets/dotNetCoreUgly.png"),
  dotNetCoreNuget: require("../assets/dotNetCoreNuGet.png"),
  middleware: require("../assets/middlewarePipeline.png")
};

preloader(images);

const theme = createTheme({
  primary: "#528DCA"
});

export default class Presentation extends React.Component {
  render() {
    return (
      <Spectacle theme={theme}>
        <Deck transition={["fade"]} transitionDuration={500} maxWidth="80%">
          <Slide bgColor="primary">
            <Heading size={1}>
              ASP.NET Core 1.0
            </Heading>
            <Heading size={5} padding={20}>
              Looking at what's new in .NET
            </Heading>
          </Slide>

          <Slide bgColor="primary" maxWidth="80%">
            <Heading size={1}>
              .NET Core 1.0
            </Heading>
            <Heading size={5} padding={20}>
              A new runtime
            </Heading>
          </Slide>
          <Slide bgColor="primary" maxWidth="80%">
            <Heading fit>
              Current state of .NET Framework
            </Heading>
          </Slide>
          <Slide bgColor="primary" maxHeight="100%" maxWidth="80%"
          notes="
            <ul>
              <li>Grew organically – from desktop to mobile devices, even to Xamarin / Mono</li>
              <li>Completely different codebase each time</li>
              <li>Things like mscorlib (BCL) have to differ between platforms as contains features that can’t be supported everywhere</li>
              <li>Introduced things like portable class libraries to target multiple verticals</li>
              <li>But underlying implementations of .NET platform are different – hard to maintain, release updates</li>
              <li>Hard for authors of reusable libraries</li>
              <li>Solution? Share implementation where possible</li>
            </ul>
          ">
            <Fill>
              <Image src={images.verticals.replace("/", "")} width="100%"/>
            </Fill>
          </Slide>

          <Slide bgColor="primary" maxWidth="80%" notes="
            <ul>
              <li>Have to update at a system level to use latest features in an application</li>
              <li>Hard for places where web servers are locked down, can’t upgrade on phones.</li>
              <li>Updating .NET framework for one app can break other apps</li>
              <li>Slows down updates to the framework - means by the time beta comes out, has to be very locked down</li>
              <li>Solution? NuGet all the things</li>
            </ul>
          ">
            <Heading fit>
              .NET Framework is machine-wide
            </Heading>
          </Slide>

          <Slide transition={["fade"]} bgColor="primary" maxHeight="100%" maxWidth="80%"
                 notes="Most code shared, just thin layer specific to runtime. Fully open source">
              <Image src={images.dotNetCore.replace("/", "")}/>
          </Slide>

          <Slide transition={["fade"]} bgColor="primary" maxHeight="100%" maxWidth="80%" notes="
            <ul>
              <li>Fully modular, served up via NuGet – eg System.Collections etc</li>
              <li>Allows applications to take dependencies on only what they need</li>
              <li>Means assemblies can be deployed with that application instead of globally</li>
              <li>Allows for .NET Native – AOT instead of JIT, compiles IL byte code to native machine code, single exe. Targetting Windows 10 Universal apps only for now, but in the future...?</li>
              <li>Major enterprise releases still exist</li>

              <li>Differences with .NET 4.6 currently – eg System.Mail, Datatables. In particularly WPF, Windows Forms.</li>
              <li>Note .NET 4.6 still exists – and may make sense to keep targeting that on Windows, at least for the near future.</li>
            </ul>
          ">
              <Image src={images.dotNetCoreNuget.replace("/", "")}/>
          </Slide>

          <Slide bgColor="primary"  maxWidth="80%">
            <Heading size={1}>
              ASP.NET Core 1.0
            </Heading>
            <Heading size={5} padding={20}>
              What's changed?
            </Heading>
          </Slide>

          <Slide transition={["fade"]} bgColor="primary" maxWidth="80%" notes="
            <ul>
              <li>Fairly fundamental changes to underlying infrastracture</li>
              <li>Big improvements to startup and configuration in a unified manner</li>

              <li>Your controllers and views will still mostly look the same – there have only really been small refinements there</li>
            </ul>
          ">
            <Appear>
              <Heading size={1} textSize="1.5em">
                Main changes to underlying framework, hosting and configuration
              </Heading>
            </Appear>
            <Appear>
              <Heading size={1} textSize="1.5em" margin="1.5em">
                General unification of features
              </Heading>
            </Appear>
          </Slide>

          <Slide bgColor="primary" maxWidth="80%" notes="
            <ul>
              <li>Fully modular, served via NuGet and open source</li>
              <li>Cross platform support</li>
              <li>Can target .NET Core or .NET 4.6</li>

              <li>Part of cross platform move means decoupling from IIS. MVC always needed to run against IIS, tied very heavily to System.Web</li>
              <li>Helps with testability</li>

              <li>Enough talking, demo the app startup.</li>
            </ul>
          ">
            <Appear>
              <Heading size={1} textSize="1.5em">
                Builds on approach from .NET Core
              </Heading>
            </Appear>
            <Appear fid="0">
              <Heading size={1} textSize="1.5em" margin="1.5em">
                Cross platform
              </Heading>
            </Appear>
            <Appear fid="1">
              <Heading size={1} textSize="1.5em" margin="1.5em">
                Decoupled from IIS – self host
              </Heading>
            </Appear>
          </Slide>

          <Slide bgColor="primary" maxWidth="80%" align="center flex-start" notes="
            <ul>
            <li>These are probably the most visible benefits for devs, fix a lot of pain points we’ve had with Bread.</li>

            <li>Config can be set in a sane way, no more Web.Config and verbose config transforms. Now just use a JSON file, read from environment variables or command line arguments.</li>

            <li>Had loads of difficulty with Ninject on Bread trying to share setup between MVC, WebAPI and OWIN middleware. Ended up having to roll a lot of it ourselves, there just wasn’t the support from the framework to do things like request scoping across the different frameworks within ASP.NET.</li>

            <li>Single entry point, everything is middleware. Easy to see what’s happening in the pipeline. Basically just a console app.</li>

            </ul>
          ">
            <Heading size={1} fit textSize="3em">
              Big improvements in setup
            </Heading>
            <Appear fid="0">
              <Heading size={1} textSize="1.5em" margin="1.5em">
                Modern configuration – XML is gone
              </Heading>
            </Appear>
            <Appear fid="1">
              <Heading size={1} textSize="1.5em" margin="1.5em">
                Unified DI framework built in
              </Heading>
            </Appear>
            <Appear fid="2">
              <Heading size={1} textSize="1.5em" margin="1.5em">
                Everything is middleware
              </Heading>
            </Appear>
          </Slide>

          <Slide bgColor="primary" maxWidth="80%" maxHeight="80%" align="center flex-start" notes="
            <ul>
            <li>Since it’s where we spend most of our time writing code, but I’ve got right to the end before mentioning it... It hasn’t changed too much</li>
            <li>Finally no more differences between WebApi and MVC. For those who haven’t experienced it, it was hard to share framework level code – eg auth filters between the different technologies, giving lots of duplication.</li>
            <li>MVC bundling / minification doesn’t exist anymore – use Grunt / Gulp etc.<li>
            <li>Tag helpers<li>
            <li>View components – reusable components, more powerful than partial views<li>
            </ul>
          ">
              <Heading size={1} textSize="3em">
                MVC 6
              </Heading>
            <Appear fid="0">
              <Heading size={1} textSize="1.5em" margin="1.5em">
                WebApi merged into MVC
              </Heading>
            </Appear>
            <Appear fid="1">
              <Heading size={1} textSize="1.5em" margin="1.5em">
                Push to front end build steps
              </Heading>
            </Appear>
            <Appear fid="2">
              <Heading size={1} textSize="1.5em" margin="1.5em">
                View components
              </Heading>
            </Appear>
            <Appear fid="3">
              <Heading size={1} textSize="1.5em" margin="1.5em">
                Tag helpers
              </Heading>
            </Appear>
          </Slide>

          <Slide bgColor="primary" maxWidth="80%" notes="Moved back with changes to CLI tools">
              <Heading size={1} textSize="3em">
                The future...
              </Heading>
            <Appear fid="0">
              <div>
                <Heading size={1} textSize="1.5em" margin="1.5em 0 0">
                  RC2: <S type="strikethrough">Feb 2016</S> ?
                </Heading>
                <Heading size={1} textSize="1.5em" margin="0.5em">
                  1.0: <S type="strikethrough">Q1 2016</S> ?
                </Heading>
                </div>
            </Appear>
            <Appear fid="1">
              <Heading size={1} textSize="1.5em" margin="1.5em">
                Signal R, Web Pages
              </Heading>
            </Appear>
          </Slide>

          <Slide bgColor="primary" maxWidth="80%">
              <Heading fit>
                Questions?
              </Heading>
          </Slide>

        </Deck>
      </Spectacle>
    );
  }
}
