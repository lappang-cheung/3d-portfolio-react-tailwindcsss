import { useState, Suspense} from 'react'
import { Canvas } from '@react-three/fiber'

import Loader from '../components/Loader'

import Plane from '../models/Plane'
import Bird from '../models/Bird'
import Sky from '../models/Sky'
import Island from '../models/Island'
import HomeInfo from '../components/HomeInfo'

const Home = () => {

	const [currentStage, setCurrentStage] = useState(1)
	const [isRotating, setIsRotating] = useState(false)

	// Adjust the island
	const adjustIslandForScreenSize = () => {
		let screenScale,
			screenPosition = [0,-6.5,-43],
			rotation = [0.1, 4.7 ,0]

		if (window.innerWidth < 768) {
			screenScale = [0.9, 0.9, 0.9]
		} else {
			screenScale = [1, 1, 1]
		}

		return [screenScale, screenPosition, rotation]
	}
	// Adjust the plane
	const adjustPLaneForScreenSize = () => {
		let screenScale,
			screenPosition

		if (window.innerWidth < 768) {
			screenScale = [0.9, 0.9, 0.9]
			screenPosition = [0, -1.5, 0]
		} else {
			screenScale = [3, 3, 3]
			screenPosition = [0 , -4, -4]
		}

		return [screenScale, screenPosition]
	}

	const [islandScale, isLandPosition, islandRotation] = adjustIslandForScreenSize()
	const [planeScale, planePosition] = adjustPLaneForScreenSize()

	return (
		<section className="w-full h-screen relative">
			<div className='absolute top-28 left-0 right-0 z-10 flex items-center justify-center'>
				{currentStage && <HomeInfo currentStage={currentStage} />}
			</div>
			<Canvas className={`w-full h-screen bg-transparent ${isRotating ? 'cursor-grabbing' : 'cursor-grab'}`}
			        camera={{ near: 0.1, far: 1000}}>
				<Suspense fallback={<Loader />}>
					<directionalLight
						position={[1,1,1]}
						intensity={2}/>
					<ambientLight
						intensity={0.5}/>
					<hemisphereLight
						skyColor="#b1e1ff"
						groundColor="#000000"
						intensity={1}/>
					<Plane
						isRotating={isRotating}
						planeSCale={planeScale}
						planePosition={planePosition}
						rotation={[0, 20, 0]}/>
					<Bird />
					<Sky
						isRotating={isRotating}
					/>
					<Island
						position={isLandPosition}
						scale={islandScale}
						rotation={islandRotation}
						setCurrentStage={setCurrentStage}
						isRotating={isRotating}
						setIsRotating={setIsRotating}
					/>
				</Suspense>
			</Canvas>
		</section>
	)
}

export default Home
