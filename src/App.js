import {Routes, Route, Outlet} from "react-router-dom";
import {Home} from "./modules/Home";
import {NotFoundPage} from "./components/NotFoundPage";
import {Header} from "./components/Header/Header";
import {PodcastDetail} from "./modules/PodcastDetail";
import {routes} from "./routes";
import styles from './App.module.css'

export const App = () => {
  return (
    <div className={styles.app}>
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index element={<Home/>} />
                <Route path={routes.podcastDetail} element={<PodcastDetail/>} />
            </Route>
            <Route path="*" element={<NotFoundPage/>} />
        </Routes>
    </div>
  );
}

const Layout = () => (
    <>
        <Header/>
        <div className={styles.layout}>
            <Outlet/>
        </div>
    </>
)
