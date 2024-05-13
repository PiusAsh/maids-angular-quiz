import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = [];
  searchResults: any[] = [];
  currentPage = 1;
  totalPages = 0;
  itemPerPage = 0;
  totalCount = 0;
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
  }
  navigateToUserDetails(userId: number): void {
    this.router.navigate(['/user', userId]);
  }
  loadUsers(): void {
    this.userService.getUsers(this.currentPage).subscribe((users) => {
      this.users = users.data;
      this.filteredUsers = this.users;
      this.totalCount = users.total;
      this.itemPerPage = users.per_page;
      this.totalPages = users.total_pages;
      console.log(users);
    });
  }
  pageChanged(page: number): void {
    this.currentPage = page;
    // Reload users based on the new page
    this.loadUsers();
  }
  onSearch(searchTerm: string): void {
    // Trim search term and convert to lowercase for case-insensitive search
    searchTerm = searchTerm.trim().toLowerCase();

    // Filter users based on search term
    this.filteredUsers = this.users.filter(
      (user) => user.id.toString().includes(searchTerm)
      // To search by first name and last name as well
      // ||
      // user.first_name.toLowerCase().includes(searchTerm) ||
      // user.last_name.toLowerCase().includes(searchTerm)
    );
  }
}
