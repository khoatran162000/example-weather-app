package com.sudo248.weather.ui.activity.main.adapter

import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import androidx.viewbinding.ViewBinding


/**
 * **Created by**
 *
 * @author *Sudo248*
 * @since 00:54 - 01/04/2023
 */
interface ItemDiff {
    fun isItemTheSame(other: ItemDiff): Boolean
    fun isContentTheSame(other: ItemDiff): Boolean
}

abstract class BaseListAdapter<T : ItemDiff, VH : BaseViewHolder<T, *>> : ListAdapter<T, VH>(
    BaseDiffCallback<T>()
) {

    override fun onBindViewHolder(holder: VH, position: Int) {
        holder.onBind(getItem(position))
    }

    override fun submitList(list: List<T>?) {
        super.submitList(list?.toList())
    }
}

abstract class BaseViewHolder<in T : Any, VB : ViewBinding>(protected val binding: VB) :
    RecyclerView.ViewHolder(binding.root) {

    abstract fun onBind(item: T)
}

class BaseDiffCallback<T : ItemDiff> : DiffUtil.ItemCallback<T>() {
    override fun areItemsTheSame(oldItem: T, newItem: T): Boolean {
        return oldItem.isItemTheSame(newItem)
    }

    override fun areContentsTheSame(oldItem: T, newItem: T): Boolean {
        return oldItem.isContentTheSame(newItem)
    }
}