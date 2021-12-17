import {GitMetadata} from "../types";
import simpleGit, { SimpleGit } from 'simple-git';


export const getGitMetadata = async (baseDir: string) => {
    const gitClient: SimpleGit = simpleGit({
        baseDir: baseDir
    });

    const git: GitMetadata = {};
    try {
        const remotes = await gitClient.getRemotes(true);
        git.remotes = remotes;
    } catch (e) {
        console.error(e)
    }

    return git;
}
