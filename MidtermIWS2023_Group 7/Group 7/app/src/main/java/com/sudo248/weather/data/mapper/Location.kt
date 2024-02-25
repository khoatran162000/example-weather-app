package com.sudo248.weather.data.mapper

import com.sudo248.weather.data.model.responses.location.LocationResponse
import com.sudo248.weather.domain.entity.Location


/**
 * **Created by**
 *
 * @author *Sudo248*
 * @since 18:00 - 19/03/2023
 */

fun LocationResponse.toDomainModel(): Location {
    return Location(
        key = Key,
        name = LocalizedName
    )
}