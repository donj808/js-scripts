import React from "react";
import * as htmlToImage from "html-to-image";
import "./styles.css";

const App = (props) => {
	const { images } = props;

	const [collageImage, setCollageImage] = React.useState(0);

	const collageRef = React.useRef();

	return (
		<div className="App">
			<div id="collage">
				<div className="collage-items" ref={collageRef}>
					{images.map((image, i) => (
						<div key={i} className="collage-item">
							<div
								className="collage-item-content"
								style={{
									backgroundImage: `url(${image.src})`,
									backgroundSize: "cover"
								}}
							>
								<div className="label">
									<div className="title">{image.label}</div>
									<div className="classification"></div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
			<div className="button" onClick={ () => createImage() }>
				<button>Convert to Image</button>
			</div>
			<div className="generatedImage">
				{collageImage ? <img id="image" alt="" src={collageImage} /> : false}
			</div>
		</div>
	);

	async function createImage() {
		let node = collageRef.current;
		if (node) {
			let options = {
				quality: 1,
				pixelRatio: 1,
				width: node.offsetWidth,
				height: node.offsetHeight
			};
			htmlToImage
				.toJpeg(node, options)
				.then(function (imgUrl) {
					setCollageImage(imgUrl);
				});
		}
	}
};

export default App;
