import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';

import { SocialNetwork, SocialNetworkPage, SocialNetworkService } from '../../services/social-network.service';
import { Observable, Subscription } from 'rxjs';
import { SocketService } from '../../services/social-socket.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../api/interfaces/user';
import { Message } from '../../services/message.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from 'ngx-editor';
import { SocialNetworkUserPage, SocialNetworkUserService } from '../../services/social-network-user.service';
import { UserPage, UserService } from '../../services/user.service';

@Component({
  selector: 'app-social-network',
  standalone: false,
  templateUrl: './social-network.component.html',
  styleUrl: './social-network.component.scss'
})

export class SocialNetworkComponent implements OnInit, AfterViewInit{
  @ViewChild('chatBody') chatBody!: ElementRef;

  open: boolean = false;
  openMember: boolean = false;
  openModalAdd: boolean = false;
  openModalDelete: boolean = false;
  openSocial: boolean = false;
  sidebarOpen = true;
  sidebarClose: boolean = false;
  networks: SocialNetwork[] = [];
  meta: any;
  selectedNetwork: any = null;

  messages: Message[] = [];
  message = '';

  private subscriptions: Subscription[] = [];
  user$!: Observable<User>;
  userId?: string;
  user?: User;
  limit = 10;
  creatingNetwork = false;
  createNetworkSuccess = '';
  createNetworkError = '';
  formCreateNetwork!: FormGroup;

  deleteNetworkSuccess = '';
  deleteNetworkError = '';
  deletingNetworkId: number | null = null;

  members: any[] = [];
  membersMeta: any;
  membersLoading = false;

  removingMemberId: number | null = null;
  removeMemberSuccess = '';
  removeMemberError = '';

  userSearchTerm: string = '';
  usersPage?: UserPage;
  usersLoading = false;
  addingUserId: string | null = null;
  addUserSuccess = '';
  addUserError = '';

  profileId?: number;
  nameUser?: string;



  constructor(
    private fb: FormBuilder,
    private socialNetworkService: SocialNetworkService,
    private userService: UserService,
    private socialNetworkUserService: SocialNetworkUserService,
    private socketService: SocketService,
    private authService: AuthService
  ) {
       this.formCreateNetwork = this.fb.group({
        name: ['', [Validators.required, Validators.maxLength(80)]]
      });

    this.authService.user$.subscribe({
      next: (res) => {
        this.profileId = res?.profile_id;
        this.nameUser = res?.name;
      },
      error: (error) => {
        console.error('Error loading user:', error);
      }
    });
  }



  ngAfterViewInit() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    try {
      const el = this.chatBody.nativeElement;
      el.scrollTop = el.scrollHeight;
    } catch (e) {}
  }

  ngOnInit() {
    this.loadNetworks();
    this.authService.getMe().subscribe({
      next: (res) => {
        this.user = res;
        this.userId = res.id;
      },
      error: (error) => {
        console.error('Error loading user:', error);
      }
    });
  }

  loadNetworks(page: number = 1) {
    this.socialNetworkService.getSocialNetworksByUser(page, 10)
      .subscribe((result: SocialNetworkPage) => {
        this.networks = result.data;
        this.meta = result.meta;
      });
  }

  loadMoreMessages() {
    this.clearSubscriptions();

    if(this.selectedNetwork && this.userId) {
      this.socketService.leaveSocialNetwork(this.selectedNetwork.id, this.userId);
    }
    this.limit += 10;

    this.socketService.joinSocialNetwork(this.selectedNetwork.id, this.userId, this.limit);

    const subHistory = this.socketService.onMessageHistory().subscribe((history) => {
      this.messages = [...history].reverse();
      setTimeout(() => this.scrollToBottom(), 0);
    });

    const subMsg = this.socketService.onMessage().subscribe((msg) => {
      this.messages.push(msg);
      setTimeout(() => this.scrollToBottom(), 0);
    });

    this.subscriptions.push(subHistory, subMsg);
  }

  openChatModal(network: any) {
    this.limit = 10;
    this.openSocial = true;
    this.scrollToBottom();

    this.clearSubscriptions();


    if(this.selectedNetwork && this.userId) {
      this.socketService.leaveSocialNetwork(this.selectedNetwork.id, this.userId);
    }

    this.selectedNetwork = network;
    this.open = true;
    this.messages = [];

    if(this.userId) this.socketService.joinSocialNetwork(network.id, this.userId, this.limit);

    const subHistory = this.socketService.onMessageHistory().subscribe((history) => {
      this.messages = [...history].reverse();
      setTimeout(() => this.scrollToBottom(), 0);
    });

    const subMsg = this.socketService.onMessage().subscribe((msg) => {
      this.messages.push(msg);
      setTimeout(() => this.scrollToBottom(), 0);
    });

    this.subscriptions.push(subHistory, subMsg);
    this.sidebarOpen = !this.sidebarOpen;
  }

  sendMessage() {
    if (!this.message.trim()) return;
    console.log(this.message)
    if(this.userId) this.socketService.sendMessage(this.selectedNetwork.id, this.userId , this.message);
    this.message = '';
  }

  clearSubscriptions() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.subscriptions = [];
  }


  closeChat() {
    this.open = false;
    this.selectedNetwork = null;
    this.messages = [];
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.subscriptions = [];
    if(this.selectedNetwork && this.userId) {
      this.socketService.leaveSocialNetwork(this.selectedNetwork.id, this.userId);
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.socketService.disconnect();
  }

  openChat(value: boolean) {
    this.open = value;
    this.openSocial = false;
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  openSocialAdd(value: boolean) {
    this.openModalAdd = value;
  }

  openSocialDelete(value: boolean) {
    this.openModalDelete = value;
  }

  onCreateNetwork() {
    if (this.formCreateNetwork.invalid) {
      this.formCreateNetwork.markAllAsTouched();
      return;
    }
    this.creatingNetwork = true;
    this.createNetworkSuccess = '';
    this.createNetworkError = '';

    const payload = {
      name: this.formCreateNetwork.value.name
    };

    this.socialNetworkService.createSocialNetworkWithUser(payload).subscribe({
      next: (newNetwork) => {
        this.createNetworkSuccess = 'Rede criada com sucesso!';
        this.creatingNetwork = false;
        this.formCreateNetwork.reset();
        this.openModalAdd = false;
        this.loadNetworks();
      },
      error: (err) => {
        this.createNetworkError = err?.error?.error || 'Erro ao criar rede.';
        this.creatingNetwork = false;
      }
    });
  }

  onDeleteNetwork(net: any) {
    if (!confirm(`Tem certeza que deseja remover a rede "${net.name}"?`)) return;

    this.deletingNetworkId = net.id;
    this.deleteNetworkSuccess = '';
    this.deleteNetworkError = '';

    this.socialNetworkService.deleteSocialNetwork(net.id).subscribe({
      next: () => {
        this.deleteNetworkSuccess = `Rede "${net.name}" removida com sucesso!`;
        this.deletingNetworkId = null;
        this.loadNetworks();
      },
      error: (err) => {
        this.deleteNetworkError = err?.error?.error || 'Erro ao remover rede.';
        this.deletingNetworkId = null;
      }
    });
  }

  loadMembers(socialNetworkId: number, page: number = 1) {
    if (!socialNetworkId) return;
    this.membersLoading = true;
    this.socialNetworkUserService.getMembers(socialNetworkId, page, 10)
      .subscribe({
        next: (result: SocialNetworkUserPage) => {
          this.members = result.data;
          this.membersMeta = result.meta;
          this.membersLoading = false;
        },
        error: () => {
          this.members = [];
          this.membersMeta = null;
          this.membersLoading = false;
        }
      });
  }

  openMembersModal(network: any) {
    this.selectedNetwork = network;
    this.openMember = true;
    this.loadMembers(network.id, 1);
  }

  onRemoveMember(member: any) {
    if (!confirm(`Remover "${member.user?.name} ${member.user?.surname}" desta rede?`)) return;

    this.removingMemberId = member.id;
    this.removeMemberSuccess = '';
    this.removeMemberError = '';

    this.socialNetworkUserService.removeMember(member.id).subscribe({
      next: () => {
        this.removeMemberSuccess = 'Membro removido com sucesso!';
        this.removingMemberId = null;

        this.loadMembers(this.selectedNetwork.id, this.membersMeta.currentPage);
      },
      error: (err) => {
        this.removeMemberError = err?.error?.error || 'Erro ao remover membro.';
        this.removingMemberId = null;
      }
    });
  }


  loadUsers(page: number = 1) {
    this.usersLoading = true;
    let obs = this.userService.getUsers(page, 10);
    if (this.userSearchTerm?.trim()) {
      obs = this.userService.searchUsersByName(this.userSearchTerm, page, 10);
    }
    obs.subscribe({
      next: (pageObj: UserPage) => {
        this.usersPage = pageObj;
        this.usersLoading = false;
      },
      error: () => {
        this.usersPage = undefined;
        this.usersLoading = false;
      }
    });
  }

  onSearchUsers() {
    this.loadUsers(1);
  }

  onAddMember(user: User) {
    if (!this.selectedNetwork?.id || !user.id) return;

    this.addingUserId = user.id;
    this.addUserSuccess = '';
    this.addUserError = '';

    this.socialNetworkUserService.addMember(this.selectedNetwork.id, user.id).subscribe({
      next: (member) => {
        this.addUserSuccess = `Usuário "${user.name}" adicionado à rede!`;
        this.addingUserId = null;

        this.loadMembers(this.selectedNetwork.id, this.membersMeta?.currentPage || 1);
        this.loadUsers(this.usersPage?.currentPage || 1);
      },
      error: (err) => {
        this.addUserError = err?.error?.error || 'Erro ao adicionar usuário.';
        this.addingUserId = null;
      }
    });
  }

  navigateBack() {
    window.history.back();
  }

}

