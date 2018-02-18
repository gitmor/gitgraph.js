import Refs from "./refs";

export interface CommitOptions {
  author: string;
  subject: string;
  body?: string;
  notes?: string;
  refs?: Refs;
  tree?: string;
  commit?: string;
  parent?: string;
}

/**
 * Generate a random hash.
 *
 * @return {string} hex string with 40 chars
 */
const getRandomHash = () => (
  (Math.random()).toString(16).substring(3) +
  (Math.random()).toString(16).substring(3) +
  (Math.random()).toString(16).substring(3) +
  (Math.random()).toString(16).substring(3)
).substring(0, 40);

export class Commit {
  /**
   * Ref names
   */
  public refs: string[];
  /**
   * Commit hash
   */
  public commit: string;
  /**
   * Abbreviated commit hash
   */
  public commitAbbrev: string;
  /**
   * Tree hash
   */
  public tree: string;
  /**
   * Abbreviated tree hash
   */
  public treeAbbrev: string;
  /**
   * Parent hashes
   */
  public parents: string[];
  /**
   * Abbreviated parent hashed
   */
  public parentsAbbrev: string[];
  /**
   * Author
   */
  public author: {
    /**
     * Author name
     */
    name: string;
    /**
     * Author email
     */
    email: string;
    /**
     * Author date
     */
    timestamp: number;
  };
  /**
   * Committer
   */
  public committer: {
    /**
     * Commiter name
     */
    name: string;
    /**
     * Commiter email
     */
    email: string;
    /**
     * Commiter date
     */
    timestamp: number;
  };
  /**
   * Subject
   */
  public subject: string;
  /**
   * Body
   */
  public body: string;
  /**
   * Notes
   */
  public notes: string;

  public constructor(options: CommitOptions) {
    // Set author & committer
    let name, email;
    try {
      [, name, email] = options.author.match(/(.*) <(.*)>/) as RegExpExecArray;
    } catch (e) {
      [name, email] = [options.author, ""];
    }
    this.author = { name, email, timestamp: Date.now() };
    this.committer = { name, email, timestamp: Date.now() };

    // Set commit message
    this.subject = options.subject;
    this.body = options.body || "";
    this.notes = options.notes || "";

    // Set commit hash
    this.commit = options.commit || getRandomHash();
    this.commitAbbrev = this.commit.substring(0, 7);

    // Set tree hash
    this.tree = options.tree || getRandomHash();
    this.treeAbbrev = this.tree.substring(0, 7);

    // Set parent hash
    this.parents = options.parent ? [options.parent] : [];
    this.parentsAbbrev = this.parents.map((commit) => commit.substring(0, 7));

    // Set ref
    this.refs = options.refs || new Refs();
  }

  getRefs(): string[] {
    return this.refs.getFromCommit(this);
  }
}