/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: experience
 * Interface for Experience
 */
export interface Experience {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  jobTitle?: string;
  /** @wixFieldType text */
  companyName?: string;
  /** @wixFieldType date */
  startDate?: Date | string;
  /** @wixFieldType date */
  endDate?: Date | string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType text */
  location?: string;
}


/**
 * Collection ID: projects
 * Interface for Projects
 */
export interface Projects {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  title?: string;
  /** @wixFieldType text */
  shortDescription?: string;
  /** @wixFieldType text */
  tags?: string;
  /** @wixFieldType text */
  problemStatement?: string;
  /** @wixFieldType text */
  approachTaken?: string;
  /** @wixFieldType text */
  toolsUsed?: string;
  /** @wixFieldType text */
  resultsImpact?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  projectImage?: string;
}


/**
 * Collection ID: skills
 * Interface for Skills
 */
export interface Skills {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  skillName?: string;
  /** @wixFieldType text */
  category?: string;
  /** @wixFieldType text */
  proficiencyLevel?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType url */
  officialWebsite?: string;
}
