import { MatChipInputEvent } from '@angular/material/chips';

import { FuseUtils } from '@fuse/utils';
import { FormGroup } from '@angular/forms';

export class Item
{
    id: string;
    name: string;
    handle: string;
    description: string;
    categories: string[];
    project:string;
    images: {
        default: boolean,
        id: string,
        url: string,
        type: string
    }[];
    price: number;
    territories:string;
    creator:string;
    link:string;
    media:string[];
    active: boolean;

    email:string;
    password:string;
    address:string;
    website:string;
    postalCode:string;
    city:string;
    telephone:string;
    sector:string;
    staffcount:string;
    activity:string;
    subPeriod:string;
    databaseSize:string;
    supportType:string;
    slaType:string;
    employee:string[][];
    /**
     * Constructor
     *
     * @param item
     */
    constructor(item?)
    {
        item = item || {};
        this.id = item.id || FuseUtils.generateGUID();
        this.name = item.name || '';
        this.handle = item.handle || FuseUtils.handleize(this.name);
        this.description = item.description || '';
        this.categories = item.categories || ['all'];
        this.project = item.project || '';
        this.images = item.images || [];
        this.price = item.price || 0;
        this.territories = item.territories || '';
        this.creator = item.creator || '';
        this.link = item.link || '';
        this.media = item.media || [];

        this.email = item.email || '';
        this.password = item.password || '';
        this.address = item.address || '';
        this.website = item.website || '';
        this.postalCode = item.postalCode || '';
        this.city = item.city || '';
        this.telephone = item.telephone || '';
        this.sector = item.sector || '';
        this.staffcount = item.staffcount || '';
        this.activity = item.activity || '';
        this.subPeriod = item.subPeriod || '';
        this.databaseSize = item.databaseSize || '';
        this.supportType = item.supportType || '';
        this.slaType = item.slaType || '';
        this.employee = item.employee || [[]];
        this.active = item.active || true;
    }

    /**
     * Add category
     *
     * @param {MatChipInputEvent} event
     */
    addCategory(event: MatChipInputEvent,form:FormGroup): void
    {
        const input = event.input;
        const value = event.value;

        // Add category
        if ( value )
        {
            this.categories.push(value);
        }

        // Reset the input value
        if ( input )
        {
            input.value = '';
        }
    }

    /**
     * Remove category
     *
     * @param category
     */
    removeCategory(category): void
    {
        if(this.categories.length > 1){
            const index = this.categories.indexOf(category);

        if ( index >= 0 )
        {
            this.categories.splice(index, 1);
        }
        }
    }

    /**
     * Add tag
     *
     * @param {MatChipInputEvent} event
     */
    addMedia(event: MatChipInputEvent): void
    {
        const input = event.input;
        const value = event.value;

        // Add tag
        if ( value )
        {
            this.media.push(value);
        }

        // Reset the input value
        if ( input )
        {
            input.value = '';
        }
    }

    /**
     * Remove tag
     *
     * @param tag
     */
    removeMedia(media): void
    {
        if(this.media.length > 1){
            const index = this.media.indexOf(media);

        if ( index >= 0 )
        {
            this.media.splice(index, 1);
        }
        }
    }
}
